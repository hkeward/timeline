IMAGE_VERSION := $(shell git rev-parse --short HEAD)
IMAGE_TAG = registry.somanydoors.ca/heather/timeline:$(IMAGE_VERSION)

docker-build:
	docker build --rm -t ${IMAGE_TAG} .

local: docker-build
	docker run --rm -it --network host $(IMAGE_TAG)
