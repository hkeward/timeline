export TIMELINE_FRONTEND_VERSION=$$(git rev-parse --short HEAD)
export TIMELINE_FRONTEND_IMAGE="timeline-front:${TIMELINE_FRONTEND_VERSION}"

build:
	rm -rf docker/target
	mkdir -p docker/target
	cp -r package.json src tests .eslintrc.js docker/target/
	cd docker && docker build --rm -t ${TIMELINE_FRONTEND_IMAGE} .
