
APK_PATH := src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
AAB_PATH := src-tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab


sign:
	keytool -genkeypair -keystore qt-tauri-release.keystore -alias qt-tauri -keyalg RSA -keysize 2048 -validity 10000
	apksigner sign --ks qt-tauri-release.keystore src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk

submit:
	@echo "Upload this file to Google Play Console:"
	@echo "$(AAB_PATH)"

installapp:
	adb install src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
