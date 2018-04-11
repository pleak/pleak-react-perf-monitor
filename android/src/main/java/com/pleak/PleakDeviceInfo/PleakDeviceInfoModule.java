package com.pleak.PleakDeviceInfo;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.provider.Settings.Secure;
import android.os.Build;
import android.webkit.WebSettings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class PleakDeviceInfoModule extends ReactContextBaseJavaModule {
  ReactApplicationContext reactContext;

  public PleakDeviceInfoModule(ReactApplicationContext reactContext) {
    super(reactContext);

    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "PleakDeviceInfo";
  }

  public String getDeviceUniqueId() {
    return Secure.getString(this.reactContext.getContentResolver(), Secure.ANDROID_ID);
  }

  @Override
  public @Nullable Map<String, Object> getConstants() {
    HashMap<String, Object> constants = new HashMap<String, Object>();

    PackageManager packageManager = this.reactContext.getPackageManager();
    String packageName = this.reactContext.getPackageName();

    constants.put("bundleId", packageName);
    constants.put("appVersion", "not available");

    try {
      PackageInfo packageInfo = packageManager.getPackageInfo(packageName, 0);
      constants.put("appVersion", packageInfo.versionName);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
      try {
        constants.put("userAgent", WebSettings.getDefaultUserAgent(this.reactContext));
      } catch (RuntimeException e) {
        constants.put("userAgent", System.getProperty("http.agent"));
      }
    }

    constants.put("brand", Build.BRAND);
    constants.put("model", Build.MODEL);
    constants.put("deviceUniqueId", this.getDeviceUniqueId());
    constants.put("systemName", "Android");
    constants.put("systemVersion", Build.VERSION.RELEASE);

    return constants;
  }
}
