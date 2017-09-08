#!/bin/bash
set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "=> Upgrade version"
VERSION=$(npm version --no-git-tag-version patch)

echo "=> Build ${VERSION} d.ts"
tsc

echo "=> Check ${VERSION} by TSLint"
tslint 'src/**/*.ts' --exclude '**/*.d.ts'

echo "=> Build ${VERSION} with webpack"
webpack

echo "=> Commit all changes in ${VERSION}"
git add --all && git commit -m "changes ${VERSION}"

echo "=> Create git tags and push to origin"
git tag ${VERSION}
git push origin ${BRANCH} && git push origin ${VERSION}

echo "=> Release to npm repository"
npm publish
