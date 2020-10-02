#! /usr/bin/env bash

# https://docs.expo.io/versions/latest/distribution/building-standalone-apps/

#### 2. Script Setup ####
# It's useful to exit the bash script when a command exits with a non-zero status
# as the following commands must be run successfully in sequence for expected results.
set -e # exit entire script when command exits with non-zero status

# Install dependencies
npm install

# [Optional] Login to Expo using username & password
# You may or may not need to do this depending on your setup.
# Note the $EXPO_USERNAME and $EXPO_PASSWORD env variables
npx expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD --non-interactive

#### 3. Publish to Expo ####
# Publish `production` release
npx expo publish --release-channel production --non-interactive

#### 4. Building Android Standalone App ####
# Start building standalone android build using `production` release channel
npx expo build:android --release-channel production --non-interactive --no-publish

# Download the artifact to current directory as `app.apk`
curl -o app.apk "$(npx expo url:apk --non-interactive)"

#### 5. Submit and publish standalone Android app to the Google Play Store ####
# Use fastlane to upload your current standalone android build
# Customize this to fit your needs. Take note of env variables.
# Check out https://docs.fastlane.tools for more info.
# https://support.zendesk.com/hc/en-us/articles/227391488-Setting-up-the-Google-Developer-console-for-the-Google-Play-integration
fastlane supply --track 'production' --json_key_data "$DELIVER_JSON_KEY" --package_name "io.beancount.android" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots

#### 6. Building iOS Standalone App ####
# Start building standalone android build using `production` release channel
npx expo build:ios --release-channel production --non-interactive

# Download the artifact to current directory as `app.ipa`
curl -o app.ipa "$(npx expo url:ipa --non-interactive)"

#### 7. Submit standalone iOS app to iTunes Connect ####
# Make sure the following env variables are set
# export DELIVER_USERNAME=<your-itunes-connect-email>
# export DELIVER_PASSWORD=<your-itunes-connect-password>

# Use fastlane to upload your current standalone iOS build to itc
fastlane deliver --verbose --ipa "app.ipa" --skip_screenshots --skip_metadata

#### Misc ####
# [Optional] You may or may not need to do this depending on your setup.
# expo logout
