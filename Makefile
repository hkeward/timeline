export IMAGE_VERSION=$$(git rev-parse --short HEAD)
export IMAGE_NAME="timeline:${IMAGE_VERSION}"

build:
	docker build --rm -t ${IMAGE_NAME} .
