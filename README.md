# VNTRAVEL


<img src="https://res.cloudinary.com/vntravel285366/image/upload/v1642082566/Minimal_Digital_Tech_Innovation_Company_Logo_8_kmvay1.png" width="60"> 

###Ứng dụng hướng đến xây dựng một môi trường để thông tin, ghi nhận những đánh giá, bình luận chân thực, chất lượng cao của những người có sở thích khám phá, du lịch ở Việt Nam. Cùng với đó là mong muốn tích hợp nhiều chức năng tiện ích trong cùng một app mang đến sự tiện lợi cao cho người sử dụng, với tạo lịch trình cho chuyến đi, và lưu trữ các thông tin, hình ảnh về chuyến đi đã qua. 

<details>
  <summary>Overview</summary>
  
  #### : Folder structure
  

  VNTravel
  ```
+---vn-travel-server
|   |   .env.example
|   |   .gitignore
|   |   package-lock.json
|   |   package.json
|   |   Procfile
|   |   server.js
|   |   
|   +---request
|   |       category.http
|   |       contribute.http
|   |       explorer.http
|   |       image.http
|   |       place.http
|   |       plan.http
|   |       province.http
|   |       report.http
|   |       review.http
|   |       section.http
|   |       tag.http
|   |       user.http
|   |       
|   \---src
|       +---helpers
|       |       Cloudinary.js
|       |       updateRateVoting.js
|       |       
|       +---middleware
|       |       requireAuth.js
|       |       requireRole.js
|       |       
|       +---models
|       |       Category.js
|       |       Contribute.js
|       |       enum.js
|       |       Explorer.js
|       |       Image.js
|       |       Place.js
|       |       Plan.js
|       |       Province.js
|       |       Report.js
|       |       Review.js
|       |       Section.js
|       |       Tag.js
|       |       User.js
|       |       
|       +---routers
|       |       authRoutes.js
|       |       categorieRoutes.js
|       |       contributeRoutes.js
|       |       explorerRoutes.js
|       |       imageRoutes.js
|       |       placeRoutes.js
|       |       planRoutes.js
|       |       provinceRoutes.js
|       |       reportRoutes.js
|       |       reviewRoutes.js
|       |       sectionRoutes.js
|       |       tagRoutes.js
|       |       userRoutes.js
|       |       
|       \---utils
|               sendMail.js
|               Timezone.js
|               
+---vn-travel-web
|   |   .env
|   |   .gitignore
|   |   package-lock.json
|   |   package.json
|   |   README.md
|   |   yarn.lock
|   |   
|   +---.netlify
|   |       state.json
|   |       
|   +---public
|   |       favicon.ico
|   |       index.html
|   |       location_icon.png
|   |       logo192.png
|   |       logo512.png
|   |       manifest.json
|   |       robots.txt
|   |       _redirects
|   |       
|   \---src
|       |   app.css
|       |   App.js
|       |   index.js
|       |   reportWebVitals.js
|       |   setupTests.js
|       |   theme.js
|       |   
|       +---app
|       |       store.js
|       |       
|       +---assets
|       |   +---boxicons-2.0.7
|       |   |   |   LICENSE.txt
|       |   |   |   
|       |   |   +---css
|       |   |   |       animations.css
|       |   |   |       boxicons.css
|       |   |   |       boxicons.min.css
|       |   |   |       transformations.css
|       |   |   |       
|       |   |   \---fonts
|       |   |           boxicons.eot
|       |   |           boxicons.svg
|       |   |           boxicons.ttf
|       |   |           boxicons.woff
|       |   |           boxicons.woff2
|       |   |           
|       |   +---css
|       |   |       grid.css
|       |   |       index.css
|       |   |       theme.css
|       |   |       
|       |   +---images
|       |   |       404-page.svg
|       |   |       empty_place.svg
|       |   |       favicon.png
|       |   |       google.svg
|       |   |       logo.png
|       |   |       logoName.png
|       |   |       logoPlane.png
|       |   |       notFound.jpg
|       |   |       shape-avatar.svg
|       |   |       wave-backgound.svg
|       |   |       wave-background.svg
|       |   |       
|       |   +---JsonData
|       |   |       sidebar_routes.json
|       |   |       status-card-data.json
|       |   |       user_menus.json
|       |   |       
|       |   \---scss
|       |           style.scss
|       |           _theme-vars.module.scss
|       |           
|       +---auth
|       |       Auth.js
|       |       
|       +---components
|       |   |   ProtectedRoute.jsx
|       |   |   Router.jsx
|       |   |   
|       |   +---dialog
|       |   |       DialogConfirm.jsx
|       |   |       
|       |   +---dropdown
|       |   |       dropdown.css
|       |   |       Dropdown.jsx
|       |   |       
|       |   +---layout
|       |   |       Header.jsx
|       |   |       layout.css
|       |   |       Layout.jsx
|       |   |       
|       |   +---loading
|       |   |       loading.css
|       |   |       Loading.jsx
|       |   |       
|       |   +---pagination
|       |   |       pagination.css
|       |   |       Pagination.jsx
|       |   |       
|       |   +---popup
|       |   |       Popup.jsx
|       |   |       
|       |   +---scrollbar
|       |   |       ScrollBar.js
|       |   |       
|       |   +---setting-page
|       |   |   \---item-card
|       |   |           itemCard.css
|       |   |           ItemCard.jsx
|       |   |           
|       |   +---sidebar
|       |   |       sidebar.css
|       |   |       Sidebar.jsx
|       |   |       
|       |   +---topNav
|       |   |       topNav.css
|       |   |       topNav.jsx
|       |   |       
|       |   \---UI
|       |           ActionButton.jsx
|       |           Button.jsx
|       |           FormattedInputs.jsx
|       |           Input.jsx
|       |           MultipleValues.jsx
|       |           Rate.jsx
|       |           Select.jsx
|       |           SwitchIcon.jsx
|       |           TimePicker.jsx
|       |           useForm.jsx
|       |           
|       +---feature
|       |   +---dashboard
|       |   |   |   Dashboard.jsx
|       |   |   |   styles.js
|       |   |   |   
|       |   |   +---comment-reports
|       |   |   |       CommentReport.jsx
|       |   |   |       styles.css
|       |   |   |       
|       |   |   +---contributes
|       |   |   |       ContributeItem.jsx
|       |   |   |       Contributes.jsx
|       |   |   |       styles.css
|       |   |   |       
|       |   |   +---new-users
|       |   |   |       NewUsers.jsx
|       |   |   |       
|       |   |   +---statistic
|       |   |   |       statistic.css
|       |   |   |       Statistic.jsx
|       |   |   |       statusCard.css
|       |   |   |       StatusCard.jsx
|       |   |   |       styles.js
|       |   |   |       
|       |   |   \---top-places
|       |   |           style.css
|       |   |           TopPlaces.jsx
|       |   |           
|       |   +---explore
|       |   |       explore.css
|       |   |       Explore.jsx
|       |   |       ExploreForm.jsx
|       |   |       exploreItem.css
|       |   |       ExploreItem.jsx
|       |   |       
|       |   +---Login
|       |   |   |   login.css
|       |   |   |   Login.jsx
|       |   |   |   
|       |   |   \---LoginForm
|       |   |           loginForm.css
|       |   |           LoginForm.jsx
|       |   |           
|       |   +---Place
|       |   |   |   place.css
|       |   |   |   placeEdit.css
|       |   |   |   PlaceEdit.jsx
|       |   |   |   Places.jsx
|       |   |   |   PlacesView.jsx
|       |   |   |   
|       |   |   +---map
|       |   |   |       map.css
|       |   |   |       Map.jsx
|       |   |   |       
|       |   |   +---navFilter
|       |   |   |       navFilter.css
|       |   |   |       NavFilter.jsx
|       |   |   |       
|       |   |   +---placeForm
|       |   |   |       placeForm.css
|       |   |   |       PlaceForm.jsx
|       |   |   |       
|       |   |   +---placeItem
|       |   |   |   |   placeItem.css
|       |   |   |   |   PlaceItem.jsx
|       |   |   |   |   SvgIconStyle.js
|       |   |   |   |   
|       |   |   |   \---tagLabel
|       |   |   |           tagLabel.css
|       |   |   |           TagLabel.jsx
|       |   |   |           
|       |   |   +---placeList
|       |   |   |       placeList.css
|       |   |   |       PlaceList.jsx
|       |   |   |       
|       |   |   \---upload
|       |   |           FileAvailableField.jsx
|       |   |           FileHeader.jsx
|       |   |           multipleUploadField.css
|       |   |           MultipleUploadField.jsx
|       |   |           SingleFileUploadField.jsx
|       |   |           singleImageReview.css
|       |   |           UploadError.jsx
|       |   |           
|       |   +---setting
|       |   |   |   setting.css
|       |   |   |   Setting.jsx
|       |   |   |   TableUiData.js
|       |   |   |   
|       |   |   +---dialog
|       |   |   |       creationDialog.css
|       |   |   |       CreationDialog.jsx
|       |   |   |       
|       |   |   \---tabPanelItem
|       |   |           tabPanelItem.css
|       |   |           TabPanelItem.jsx
|       |   |           
|       |   \---User
|       |       |   user.css
|       |       |   User.jsx
|       |       |   
|       |       \---searchNotFound
|       |               SearchNotFound.jsx
|       |               
|       +---pages
|       |       error.css
|       |       Error.jsx
|       |       Landing.jsx
|       |       User.jsx
|       |       
|       +---redux
|       |       authSlice.js
|       |       categorySlice.js
|       |       contributeSlice.js
|       |       exploreSlide.js
|       |       placeSlice.js
|       |       provinceSlice.js
|       |       reportSlice.js
|       |       tagSlice.js
|       |       userSlice.js
|       |       
|       \---utils
|               constants.js
|               setAuthToken.js
|               
\---vntravelApp
    |   .buckconfig
    |   .editorconfig
    |   .eslintrc.js
    |   .flowconfig
    |   .gitattributes
    |   .gitignore
    |   .prettierrc.js
    |   .watchmanconfig
    |   App.js
    |   app.json
    |   babel.config.js
    |   index.js
    |   metro.config.js
    |   package-lock.json
    |   package.json
    |   react-native.config.js
    |   
    +---.vscode
    |       settings.json
    |       
    +---android
    |   |   build.gradle
    |   |   gradle.properties
    |   |   gradlew
    |   |   gradlew.bat
    |   |   java_pid9016.hprof
    |   |   settings.gradle
    |   |   
    |   +---app
    |   |   |   BUCK
    |   |   |   build.gradle
    |   |   |   build_defs.bzl
    |   |   |   debug.keystore
    |   |   |   proguard-rules.pro
    |   |   |   
    |   |   \---src
    |   |       +---debug
    |   |       |   |   AndroidManifest.xml
    |   |       |   |   
    |   |       |   \---java
    |   |       |       \---com
    |   |       |           \---vntravelapp
    |   |       |                   ReactNativeFlipper.java
    |   |       |                   
    |   |       \---main
    |   |           |   AndroidManifest.xml
    |   |           |   
    |   |           +---assets
    |   |           |   \---fonts
    |   |           |           AntDesign.ttf
    |   |           |           Bangers-Regular.ttf
    |   |           |           Entypo.ttf
    |   |           |           EvilIcons.ttf
    |   |           |           Feather.ttf
    |   |           |           FontAwesome.ttf
    |   |           |           FontAwesome5_Brands.ttf
    |   |           |           FontAwesome5_Regular.ttf
    |   |           |           FontAwesome5_Solid.ttf
    |   |           |           Fontisto.ttf
    |   |           |           Foundation.ttf
    |   |           |           Ionicons.ttf
    |   |           |           LexendDeca-Black.ttf
    |   |           |           LexendDeca-Bold.ttf
    |   |           |           LexendDeca-ExtraBold.ttf
    |   |           |           LexendDeca-ExtraLight.ttf
    |   |           |           LexendDeca-Light.ttf
    |   |           |           LexendDeca-Medium.ttf
    |   |           |           LexendDeca-Regular.ttf
    |   |           |           LexendDeca-SemiBold.ttf
    |   |           |           LexendDeca-Thin.ttf
    |   |           |           MaterialCommunityIcons.ttf
    |   |           |           MaterialIcons.ttf
    |   |           |           Octicons.ttf
    |   |           |           SimpleLineIcons.ttf
    |   |           |           VarelaRound-Regular.ttf
    |   |           |           Zocial.ttf
    |   |           |           
    |   |           +---java
    |   |           |   \---com
    |   |           |       \---vntravelapp
    |   |           |               MainActivity.java
    |   |           |               MainApplication.java
    |   |           |               
    |   |           \---res
    |   |               +---mipmap-anydpi-v26
    |   |               |       ic_launcher.xml
    |   |               |       
    |   |               +---mipmap-hdpi
    |   |               |       ic_launcher.png
    |   |               |       ic_launcher_adaptive_back.png
    |   |               |       ic_launcher_adaptive_fore.png
    |   |               |       ic_launcher_round.png
    |   |               |       
    |   |               +---mipmap-ldpi
    |   |               |       ic_launcher.png
    |   |               |       ic_launcher_round.png
    |   |               |       
    |   |               +---mipmap-mdpi
    |   |               |       ic_launcher.png
    |   |               |       ic_launcher_adaptive_back.png
    |   |               |       ic_launcher_adaptive_fore.png
    |   |               |       ic_launcher_round.png
    |   |               |       
    |   |               +---mipmap-xhdpi
    |   |               |       ic_launcher.png
    |   |               |       ic_launcher_adaptive_back.png
    |   |               |       ic_launcher_adaptive_fore.png
    |   |               |       ic_launcher_round.png
    |   |               |       
    |   |               +---mipmap-xxhdpi
    |   |               |       ic_launcher.png
    |   |               |       ic_launcher_adaptive_back.png
    |   |               |       ic_launcher_adaptive_fore.png
    |   |               |       ic_launcher_round.png
    |   |               |       
    |   |               +---mipmap-xxxhdpi
    |   |               |       ic_launcher.png
    |   |               |       ic_launcher_adaptive_back.png
    |   |               |       ic_launcher_adaptive_fore.png
    |   |               |       ic_launcher_round.png
    |   |               |       
    |   |               \---values
    |   |                       strings.xml
    |   |                       styles.xml
    |   |                       
    |   \---gradle
    |       \---wrapper
    |               gradle-wrapper.jar
    |               gradle-wrapper.properties
    |               
    +---ios
    |   |   Podfile
    |   |   
    |   +---vntravelApp
    |   |   |   AppDelegate.h
    |   |   |   AppDelegate.m
    |   |   |   Info.plist
    |   |   |   LaunchScreen.storyboard
    |   |   |   main.m
    |   |   |   
    |   |   \---Images.xcassets
    |   |       |   Contents.json
    |   |       |   
    |   |       \---AppIcon.appiconset
    |   |               Contents.json
    |   |               
    |   +---vntravelApp.xcodeproj
    |   |   |   project.pbxproj
    |   |   |   
    |   |   \---xcshareddata
    |   |       \---xcschemes
    |   |               vntravelApp.xcscheme
    |   |               
    |   \---vntravelAppTests
    |           Info.plist
    |           vntravelAppTests.m
    |           
    +---src
    |   +---app
    |   |       storeApp.js
    |   |       
    |   +---assets
    |   |   |   headerbackground_home.jpg
    |   |   |   mockupData.js
    |   |   |   
    |   |   +---fonts    
    |   |   \---images
    |   |           avatar.jpg
    |   |           back_1.jpg
    |   |           back_2.jpg
    |   |           back_3.jpg
    |   |           back_4.jpg
    |   |           back_5.png
    |   |           back_6.jpg
    |   |           calendar.json
    |   |           dalat.jpg
    |   |           empty.json
    |   |           failGif.json
    |   |           fillChangePassword.png
    |   |           filter.png
    |   |           forgot_password.png
    |   |           google.png
    |   |           instruction.png
    |   |           loading.json
    |   |           loadingFlash.gif
    |   |           location.png
    |   |           login.png
    |   |           login.svg
    |   |           loginModal.png
    |   |           logo.png
    |   |           menu.png
    |   |           photo.png
    |   |           Place_Not_Support.jpg
    |   |           Rectangle.png
    |   |           runman.gif
    |   |           send_email.png
    |   |           signin.json
    |   |           smartbot.json
    |   |           success.json
    |   |           success.png
    |   |           successUpdate.json
    |   |           welcome.jpg
    |   |           
    |   +---components
    |   |   |   ActionButton.js
    |   |   |   AutoComplete.js
    |   |   |   BottomModal.js
    |   |   |   BottomNavigation.js
    |   |   |   ButtonGroup.js
    |   |   |   CreatePopup.js
    |   |   |   FlatListPlaceSuggestion.js
    |   |   |   FormInput.js
    |   |   |   ImageModal.js
    |   |   |   ImagesPicker.js
    |   |   |   index.js
    |   |   |   InformModal.js
    |   |   |   InputText.js
    |   |   |   RatingCustom.js
    |   |   |   Skeleton.js
    |   |   |   Spacer.js
    |   |   |   TextButton.js
    |   |   |   Toast.js
    |   |   |   TwoPointSlider.js
    |   |   |   
    |   |   +---detailPlace
    |   |   |       ReviewItem.js
    |   |   |       ReviewList.js
    |   |   |       
    |   |   +---home
    |   |   |   |   CategoryItems.js
    |   |   |   |   PlaceCard.js
    |   |   |   |   useInterval.js
    |   |   |   |   
    |   |   |   \---Carousel
    |   |   |           Carousel.js
    |   |   |           CarouselItem.js
    |   |   |           ImageCarouselItem.js
    |   |   |           Paginator.js
    |   |   |           
    |   |   +---MainLayout
    |   |   |       Header.js
    |   |   |       TabButton.js
    |   |   |       
    |   |   +---place
    |   |   |       BigPlaceCard.js
    |   |   |       FilterModal.js
    |   |   |       ProvinceCard.js
    |   |   |       
    |   |   \---plan
    |   |           BigSection.js
    |   |           CollectionItem.js
    |   |           PlaceInSec.js
    |   |           PlanCard.js
    |   |           Section.js
    |   |           
    |   +---constants
    |   |       Color.js
    |   |       constants.js
    |   |       dummyData.js
    |   |       icons.js
    |   |       images.js
    |   |       index.js
    |   |       themes.js
    |   |       
    |   +---controller
    |   |       Auth.js
    |   |       Contribute.js
    |   |       index.js
    |   |       Place.js
    |   |       Plan.js
    |   |       Review.js
    |   |       Translate.js
    |   |       User.js
    |   |       
    |   +---helpers
    |   |       helperFunction.js
    |   |       toast.js
    |   |       
    |   +---language
    |   |       en.js
    |   |       index.js
    |   |       vi.js
    |   |       
    |   +---navigations
    |   |       AuthStack.js
    |   |       MainStack.js
    |   |       ProfileStack.js
    |   |       Route.js
    |   |       SearchStack.js
    |   |       
    |   +---screens
    |   |   |   index.js
    |   |   |   MainLayout.js
    |   |   |   
    |   |   +---auth
    |   |   |       CheckMail.js
    |   |   |       ForgotPassword.js
    |   |   |       SigninScreen.js
    |   |   |       SignupScreen.js
    |   |   |       
    |   |   +---home
    |   |   |       HomeScreen.js
    |   |   |       
    |   |   +---onboarding
    |   |   |       Onboarding.js
    |   |   |       
    |   |   +---place
    |   |   |       ExploreView.js
    |   |   |       PlaceDetailScreen.js
    |   |   |       PlacesView.js
    |   |   |       ProvincesView.js
    |   |   |       SearchPlace.js
    |   |   |       
    |   |   +---plan
    |   |   |       Collection.js
    |   |   |       CreatePlan.js
    |   |   |       EditPlan.js
    |   |   |       PlanDetail.js
    |   |   |       PlanScreen.js
    |   |   |       TripPlan.js
    |   |   |       
    |   |   +---profile
    |   |   |       ChangeLanguage.js
    |   |   |       ChangePassword.js
    |   |   |       EditProfile.js
    |   |   |       MyFavorites.js
    |   |   |       ProfileScreen.js
    |   |   |       
    |   |   +---review
    |   |   |       CreateReview.js
    |   |   |       ReviewsView.js
    |   |   |       
    |   |   +---search
    |   |   |       ChooseLocationScreen.js
    |   |   |       FindPlaceScreen.js
    |   |   |       SearchScreen.js
    |   |   |       
    |   |   \---voice
    |   |           command.js
    |   |           Map.js
    |   |           VoiceDetect.js
    |   |           
    |   +---stores
    |   |       authSlice.js
    |   |       placeSlice.js
    |   |       planSlice.js
    |   |       screenSlice.js
    |   |       searchSlide.js
    |   |       tabSlide.js
    |   |       voiceBotSlice.js
    |   |       
    |   \---utils
    |           constants.js
    |           index.js
    |           setAuthToken.js
    |           Utils.js
    |           
    \---__tests__
            App-test.js
            
  ```
</details>


## Install instruction

<details>
  <summary>Set up admin web</summary>
  
 - Step 1: Clone project
```bash
git clone https://github.com/TienNHM/x2mint.git
```

- Bước 2: Install
```bash
npm install
```

- Step 3: Add file `.env` containt enviroment variale.

Move to `/vn-travel-web` folder , create new file `.env`
- Bước 4: Khởi chạy

In `/vn-travel-web` , open terminal and run these commands: 

```bash
npm run start
```

or:

```bash
yarn start
```

**Result:**

```
Compiled successfully!

You can now view clients in the browser.

  Local:            http://localhost:3000        
  On Your Network:  http://192.168.56.1:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Access to [http://localhost:3000](http://localhost:3000) to view the website.
 <details>
 
 <details>
  <summary>Set up mobile app</summary>
  
 - Step 1: Clone project
```bash
git clone https://github.com/TienNHM/x2mint.git
```

- Bước 2: In `/vntravelApp` folder, install
```bash
npm install
```

- Step 3: Add file `.env` containt enviroment variale.

Move to `/vntravelApp` folder , create new file `.env`
- Bước 4: Khởi chạy

In `/vntravelApp` , open terminal and run these commands: 

```bash
npx react-native run-android
```

**Result:**

```
BUILD SUCCESSFUL in 4m 12s
324 actionable tasks: 2 executed, 322 up-to-date
info Connecting to the development server...
8081
info Starting the app on "112d51fc"...
Starting: Intent { cmp=com.vntravelapp/.MainActivity }
```

Node js terminal is opened.
 <details>


## Deployed product 
###Server with heroku
 [![](https://vntravel-api.herokuapp.com/app/api/v1)]
 
###Admin web with netlify
 [![](https://vntravelguide.netlify.app/admin/dashboard)]

## Intergrate
```
ALAN AI Flatform
[![](https://alan.app/brand_assets/logo-horizontal/color/alan-logo-horizontal-color.png)]

Google Translate API
[![](https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png)]

## Contributors

[![](https://avatars.githubusercontent.com/u/72262482?v=4&s=100)](https://www.facebook.com/hoangnguyen.monokuro/) 
[![](https://avatars.githubusercontent.com/u/46836329?v=4&s=100)](https://www.facebook.com/thaoleVer)
