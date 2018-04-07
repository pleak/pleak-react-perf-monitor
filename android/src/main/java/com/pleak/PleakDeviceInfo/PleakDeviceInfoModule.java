package com.pleak.PleakDeviceInfo;

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

  @Override
  public @Nullable Map<String, Object> getConstants() {
    HashMap<String, Object> constants = new HashMap<String, Object>();

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
      try {
        constants.put("userAgent", WebSettings.getDefaultUserAgent(this.reactContext));
      } catch (RuntimeException e) {
        constants.put("userAgent", System.getProperty("http.agent"));
      }
    }

    return constants;
  }
}
