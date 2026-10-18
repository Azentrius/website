#!/bin/sh
# SPDX-License-Identifier: Apache-2.0
# Packs dist/ into build/azentrius-website-VERSION.tar.gz (one folder azentrius-website-VERSION/) and
# writes build/SHA256SUMS. Sorted names, fixed owner and times: the same dist/ gives the same archive.
set -eu
version=$(node -p "require('./package.json').version")
epoch=${SOURCE_DATE_EPOCH:-$(git log -1 --format=%ct)}
name="azentrius-website-$version"
test -f dist/index.html || { echo "dist/ is missing; run npm run build first." >&2; exit 1; }
mkdir -p build
rm -f "build/$name.tar.gz" build/SHA256SUMS
tar --sort=name --owner=0 --group=0 --numeric-owner --mtime="@$epoch" \
  --transform "s|^\.|$name|" -C dist -cf - . | gzip -n -9 > "build/$name.tar.gz"
(cd build && sha256sum "$name.tar.gz" > SHA256SUMS)
cat build/SHA256SUMS
