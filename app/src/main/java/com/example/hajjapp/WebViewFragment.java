package com.example.hajjapp;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.example.hajjapp.MainViewModel;
import com.example.hajjapp.R;

public class WebViewFragment extends Fragment {

    private WebView webView;
    private MainViewModel mainViewModel;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_webview, container, false);
        webView = view.findViewById(R.id.webView);
        mainViewModel = new ViewModelProvider(requireActivity()).get(MainViewModel.class);
        setupWebView();
        return view;
    }

    private void setupWebView() {
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setGeolocationEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(false); // Disable database access for security
        webSettings.setAllowFileAccess(false); // Restrict file access
        webSettings.setAllowContentAccess(false); // Restrict content access
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE); // Disable caching

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // Validate URLs before loading
                if (url.startsWith("https://") || url.startsWith("http://")) {
                    return false; // Allow loading
                } else {
                    if (mainViewModel != null) {
                        mainViewModel.setErrorMessage("Blocked insecure URL");
                    }
                    return true; // Block loading
                }
            }
        });
    }

    public void loadUrl(String url) {
        if (webView != null) {
            webView.loadUrl(url);
        }
    }
}
