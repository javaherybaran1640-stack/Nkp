
package com.nkp.app;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    @Override protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);
        WebSettings ws = webView.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setAllowFileAccess(true);
        ws.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
        webView.setWebViewClient(new WebViewClient());
        // Load bundled PWA from assets
        webView.loadUrl("file:///android_asset/www/index.html");
    }
    @Override public void onBackPressed(){
        if(webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
