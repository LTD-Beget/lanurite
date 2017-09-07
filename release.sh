#!/bin/bash
set -e

BRANCH=$1

echo "=> Upgrade version"
VERSION=$(npm version --no-git-tag-version patch)

echo "=> Build ${VERSION} with webpack"
webpack

echo "=> Commit all changes in ${VERSION}"
git add --all && git commit -m "changes ${VERSION}"

echo "=> Create git tags and push to origin"
git tag ${VERSION}
git push origin ${BRANCH} && git push origin ${VERSION}
