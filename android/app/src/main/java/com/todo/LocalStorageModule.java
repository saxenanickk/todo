package com.todo;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LocalStorageModule extends ReactContextBaseJavaModule {

    ReactApplicationContext mReactApplicationContext;

    public LocalStorageModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        mReactApplicationContext = reactApplicationContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "LocalStorage";
    }

    @ReactMethod
    public void getItem(String key, final Callback callback) {
        SharedPreferences sharedpreferences = mReactApplicationContext.getApplicationContext().getSharedPreferences("LOCAL_STORAGE", Context.MODE_PRIVATE);

        String value =  sharedpreferences.getString(key,null);

        callback.invoke(value);
    }

    @ReactMethod
    public void setItem(String key, String value) {
        SharedPreferences sharedpreferences = mReactApplicationContext.getApplicationContext().getSharedPreferences("LOCAL_STORAGE", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedpreferences.edit();

        editor.putString(key, value);

        editor.apply();
    }
}
