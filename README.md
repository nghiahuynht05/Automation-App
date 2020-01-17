# 1. Setup enviroment variables

## APPIUM SERVER

## ANDROID_HOME JAVA_HOME
1. From the desktop, right click the Computer icon.
2. Choose Properties from the context menu.
3. Click the Advanced system settings link.
4. Click Environment Variables. In the section System Variables, find the PATH environment variable and select it. Click Edit. If the PATH environment variable does not exist, click New.
5. In the Edit System Variable (or New System Variable) window, specify the value of the PATH environment variable. Click OK. Close all remaining windows by clicking OK.
6. Reopen Command prompt window, and run your java code.

Android SDK: if can't install Android SDK, use Android Studio dowload Android SDK. 
1. Set up:
- Tools/ SDK Manager/
- Installed SDK: Andoird xxx

2. Local file Andoird SDK
- C:\Users\[user_name]\AppData\Local\Android\Sdk

## Setup node, env enviroment
- Paste file APK in local: ./features/step_definitions/input
- update FILE_NAME in env file
- run: npm i

## RUN uiautomatorviewer.bat for test
Open CMD:

C:\Users\[PC-name]\AppData\Local\Android\Sdk\tools\bin
 
or ..\AppData\Local\Android\Sdk\tools\bin

enter: uiautomatorviewer.bat

## APK info: 
https://play.google.com/store/apps/details?id=com.wt.apkinfo&hl=en_US

# 1. Run test case
run: npm test test/features/test.feature
debug: DEBUG=TEST:* npm test test/features/test.feature

# 2. Run Report
run: npm test test/features/test.feature -f json:test/report/[namefile].json
run npm bdd/report/index.js

# 3. Document
Document setup
http://appium.io/docs/en/drivers/android-uiautomator2/index.html

Appium document
http://appium.io/docs/en/about-appium/intro/

appActivity: "com.qup.driver.ui.launcher.LauncherActivity" //driver
appActivity: "com.qup.pegasus.ui.launch.LauncherActivity" // pax
appPackge: "com.qupworld.pegasuspax"
appPackge: "com.qupworld.pegasusdriver"

# 2. Script RUN

## Login screen
npm test test/features/login-user-password-driver-pegasus.feature test/features/login-phone-password-driver-pegasus.feature test/features/login-driver-pegasus.feature

## Resquest screen
npm test test/features/request-screen-driver-pegasus.feature
