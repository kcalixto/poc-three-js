deploy:
	npm run build; \
	AWS_PROFILE=cf aws s3 sync dist/ s3://cf-serverless-3d-sample-test --delete
