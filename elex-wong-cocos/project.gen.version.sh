#!/bin/bash

MAJOR=3
MINOR=0
REVISION=0
RADIX=100

git rev-list HEAD | sort > configCache.git-hash
LOCALVER=`wc -l configCache.git-hash | awk '{print $1}'`
VER_LINE=${LOCALVER}
PUB_TIME=`date +%Y%m%d_%H%M%S`
PUB_TIME=\'${PUB_TIME}\'
BRANCH_NAME=`git symbolic-ref --short -q HEAD`
echo ${BRANCH_NAME}
echo PUB_TIME=$PUB_TIME
if [ $LOCALVER \> 1 ] ; then
    VER=`git rev-list origin/${BRANCH_NAME} | sort | join configCache.git-hash - | wc -l | awk '{print $1}'`
#    if [ $VER != $LOCALVER ] ; then
#        VER="$VER+$(($LOCALVER-$VER))"
#    fi
    if git status | grep -q "modified:" ; then
        VER="${VER}"
    fi
    #VER="$VER $(git rev-list HEAD -n 1 | cut -c 1-7)"
    GIT_VERSION=$VER

else
    GIT_VERSION=
    VER="0"
fi

GIT_HASH_VERSION=`sed -n ${VER_LINE}p configCache.git-hash`
GIT_HASH_VERSION=\'$GIT_HASH_VERSION\'
echo GIT_HASH_VERSION=$GIT_HASH_VERSION

echo $GIT_VERSION
MINOR=$[$GIT_VERSION/$RADIX]
REVISION=$[$GIT_VERSION%$RADIX]
GIT_VERSION=$MAJOR.$MINOR.$REVISION
GIT_VERSION=\'$GIT_VERSION\'
echo GIT_VERSION=$GIT_VERSION
BRANCH_NAME=\'$BRANCH_NAME\'
rm -f configCache.git-hash

sed -i "/PubTime/s/: [-_:'0-9]*/: $PUB_TIME/g" assets/scripts/version.ts
sed -i "/GitHashVersion/s/: [a-z0-9']*/: $GIT_HASH_VERSION/g" assets/scripts/version.ts
sed -i "/VersionNo/s/: [.0-9']*/: $GIT_VERSION/g" assets/scripts/version.ts
sed -i "/BranchName/s/: [_.0-9a-zA-Z']*/: $BRANCH_NAME/g" assets/scripts/version.ts

echo "Generated git version finish  "