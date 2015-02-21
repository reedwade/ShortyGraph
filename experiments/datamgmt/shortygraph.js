

var episode = 200001;

var w = 1280;
var h = 800;

var curve_factor = {
    "A":0.8,
    "B":0.7,
    "C":0.0,
    "D":0.9,
    "E":0.0,
    "F":0.0
};

function label_to_class(name) {
    // convert a text label into a string we can use as a class reference
    // -- replace spaces with dashes and flatten to lower case
    return name.replace(/ /g, '-').toLowerCase();
}

function set_episode_year(year) {
    year = parseInt(year);
    d3.select("#episode_year_value").text(year);
    set_episode((100*year) + (episode % 100));
}
function set_episode_month(month) {
    month = parseInt(month);
    d3.select("#episode_month_value").text(month);
    console.log(episode);
    console.log(episode / 100);
    console.log(Math.floor(episode / 100));
    console.log(100*Math.floor(episode / 100));
    console.log((100*Math.floor(episode / 100)) + month);
    set_episode((100*Math.floor(episode / 100)) + month);
}


function get_node_classes(node) {
    return "node node-"+node_classes[node.name];
}

function get_link_classes(link) {
    return "link link-type-"+label_to_class(link.type)+" link-label-"+label_to_class(link.label);
}

function set_link_distance(link_distance) {
    force.linkDistance(link_distance);
    force.start();
}
function set_charge(charge) {
    force.charge(charge);
    force.start();
}


var text;
var arc_text;


var force = d3.layout.force()
    .size([w, h])
    .linkDistance(60)
    .charge(-200)
    .on("tick", tick)
    ;

var svg = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var path;
var circle;

function node_click(d, i) {
    if (d3.event.shiftKey) {
        d.fixed = ! d.fixed;
    }
}


svg.append("svg:defs").append("svg:marker")
    .attr("id", "arrow1")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .style("opacity", "0.6")
    ;


var nodes = [];

inputs.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

nodes = d3.values(nodes);


function rebuild_graph() {

    nodes.forEach(function(element, index, array) {
        // hide all nodes except those show in this episode
        array[index].hideme = true;
    });


    var links = [];

    inputs.forEach(function(link) {
        if (link.starting <= episode && link.ending >= episode) {
            // unhide nodes in this episode
            link.source.hideme = false;
            link.target.hideme = false;
            // populate the current link list
            links.push(link);
        }
    });

    nodes.forEach(function(element, index, array) {

        // scoot hidden nodes out of view -- wish there was a way to actually switch them off
        // but this seems to work best

        if (array[index].hideme) {
            array[index].fixed = 1;
            array[index].x = 
            array[index].px = -40;
            array[index].y = 
            array[index].py = -40;
            array[index].hidden = true;
        } else if (array[index].hidden) {
            // was hidden but is now visible in this episode
            array[index].hidden = false;
            array[index].fixed = 0;
            array[index].x = 
            array[index].px = w/2;
            array[index].y = 
            array[index].py = h/2;
        }
    });


    force
        .nodes(nodes)
        .links(links)
        .start()
        ;

    svg.selectAll("g").remove();

    //
    // link arcs
    //
    path = svg.append("svg:g").selectAll("path")
        .data(force.links())
        .enter().append("svg:path")
        .attr("class", function(link) { return get_link_classes(link); })
        .attr("marker-end", function(link) { return "url(#" + link.marker_end + ")"; })
        ;

    //
    // node shape, normally a circle
    //
    circle = svg.append("svg:g").selectAll("circle")
        .data(force.nodes())
        .enter().append("svg:circle")
        .attr("r", 5)
        .attr("class", function(node) { return get_node_classes(node); })
        .call(force.drag)
        .on("click", node_click)
        .on("dblclick", function(node) { node.fixed = !node.fixed; })
        ;

    //
    // arc label -- TODO, instead of separate for each link, should combine w/commas
    //
    arc_text = svg.append("svg:g").selectAll("g")
        .data(force.links())
        .enter().append("svg:g");

        // A copy of the text with a thick white stroke for legibility.
        arc_text.append("svg:text")
            .attr("x", 12)
            .attr("y", ".31em")
            .attr("class", "shadow arc")
            .text(function(d) { return d.label; });

        arc_text.append("svg:text")
            .attr("x", 12)
            .attr("y", ".31em")
            .attr("class", "arc")
            .text(function(d) { return d.label; });

    //
    // text label
    //

    text = svg.append("svg:g").selectAll("g")
        .data(force.nodes())
        .enter().append("svg:g");

        // A copy of the text with a thick white stroke for legibility.
        text.append("svg:text")
            .attr("x", 12)
            .attr("y", ".31em")
            .attr("class", "shadow")
            .text(function(d) { return d.name; });

        text.append("svg:text")
            .attr("x", 12)
            .attr("y", ".31em")
            .text(function(d) { return d.name; });

}


function tick() {
    path.attr("d", function(link) {
        var dx = link.target.x - link.source.x,
            dy = link.target.y - link.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);

        dr = dr * (curve_factor[link.type] || 0); 

        return "M" + link.source.x + "," + link.source.y + "A" + dr + "," + dr + " 0 0,1 " + link.target.x + "," + link.target.y;
    });

    circle.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    text.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    arc_text.attr("transform", function(d) {
        // TODO: needs work but this is ok for the moment
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy),
            x = d.target.x-(dx/2) -(5*d.label.length),
            y = d.target.y-(dy/2);

        return "translate(" + x + "," + y + ")";
    });
}


function set_episode(new_episode) {
    episode = new_episode;
    console.log("set_episode", episode);
    d3.select("#episode").text(episode);
    rebuild_graph();
}
set_episode(episode);