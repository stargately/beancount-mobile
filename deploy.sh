#! /usr/bin/env bash

# https://docs.expo.dev/build/introduction/

set -e # exit on error

# Install dependencies
yarn

# Install EAS CLI if not already installed
yarn global add eas-cli@latest

# No need for login; EAS_TOKEN will be used automatically by the CLI if set
# export EAS_TOKEN=your-token # <-- make sure this is set in your CI or shell environment

#### 2. Send Over-the-Air Updates ####
eas update --channel production --message "Production update $(date +'%Y-%m-%d %H:%M:%S')"


#### 5. Build iOS App ####
echo "Building iOS app..."
eas build --platform ios --profile production --non-interactive --no-wait

#### 6. Submit iOS App ####
echo "Submitting iOS app to App Store..."
eas submit --platform ios --latest --non-interactive


### 3. Build Android App ####
echo "Building Android app..."
eas build --platform android --profile production --non-interactive --no-wait

#### 4. Submit Android App ####
echo "Submitting Android app to Play Store..."
eas submit --platform android --latest --non-interactive
