
all:
	@echo "try this:"
	@echo "	make local-server"
	@echo "	make storylines_2013.html"

local-server:
	@echo "http://localhost:8000/"
	python -m SimpleHTTPServer

storylines_2013.html:
	curl 'http://en.wikipedia.org/wiki/Storylines_of_Shortland_Street_(2013)' -o storylines_2013.html


clean:
	rm -f storylines_*.html
	