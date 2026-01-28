APK_PATH := src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
AAB_PATH := src-tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab

build:
	cargo tauri android build --apk
	# keytool -genkeypair -keystore qt-tauri-release.keystore -alias qt-tauri -keyalg RSA -keysize 2048 -validity 10000
	apksigner sign --ks qt-tauri-release.keystore src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk

move:
	mv src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk ./qt-tauri.apk

copy:
	jmtpfs ~/android
	mv ./qt-tauri.apk /home/antonio/android/Armazenamento\ interno/APK/qt-tauri.apk
	fusermount -u ~/android

installapp:
	adb install src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
