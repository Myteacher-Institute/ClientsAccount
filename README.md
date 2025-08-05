This is a working version of the **Clients Account** mobile app.

# Getting Started

> **Note**: Make sure you have cloned the [ClientsAcct Repo](https://github.com/Myteacher-Institute/ClientsAcct) from Github before proceeding.

## Step 1: Install Dependencies

First, you will need to run install all packages and dependencies required to run the app.

To install dependencies, run the following command from the root of your React Native project:

```sh
# Using Yarn
yarn install
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using Yarn
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use the command below to build and run your Android:

```sh
# Using Yarn
yarn android
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio.

## Step 4: Modify your app

Open `app/api/instance.js` in your text editor of choice and change `${IPAddress}` in this line `baseURL: 'http://${IPAddress}:3000/api/v1/users/',` to your laptop's IP Address. When you save, your app should be able to interact with the back-end seamlessly.

## Congratulations! :tada:

You've successfully run and modified your Clients Account App. :partying_face:

### Now what to do?

- Sign up to the Clients Account on your android device.

- After successful sign up, you should be navigated to the KYCScreen.

- Go back to the welcome screen and click on the sign in button.

- Sign in using the details from the sign up process and you should be navigated to your dashboard.

## Congratulations! :tada:

You've successfully signed in to your Clients Account App. :partying_face:

### API Integrations

- ~~Api to register user~~

- ~~Api to upload kyc documents~~

- ~~Api to login user~~

- ~~Api to get user details~~

- Api to update user profile

- ~~Api to upload user avatar~~

- Api to listen for any deposit transaction

- Api to top-up with card

- Api to retrieve the details of a reserved account

- Api to withdraw funds
