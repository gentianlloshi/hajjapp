package com.example.hajjapp;

import androidx.arch.core.executor.testing.InstantTaskExecutorRule;
import androidx.lifecycle.Observer;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

public class MainViewModelTest {

    @Rule
    public InstantTaskExecutorRule instantTaskExecutorRule = new InstantTaskExecutorRule();

    private MainViewModel viewModel;

    @Mock
    private Observer<Boolean> permissionObserver;

    @Mock
    private Observer<String> errorObserver;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        viewModel = new MainViewModel();
        viewModel.isLocationPermissionGranted().observeForever(permissionObserver);
        viewModel.getErrorMessage().observeForever(errorObserver);
    }

    @Test
    public void testSetLocationPermissionGranted() {
        viewModel.setLocationPermissionGranted(true);
        verify(permissionObserver).onChanged(true);

        viewModel.setLocationPermissionGranted(false);
        verify(permissionObserver).onChanged(false);
    }

    @Test
    public void testSetErrorMessage() {
        String errorMessage = "Test error message";
        viewModel.setErrorMessage(errorMessage);
        verify(errorObserver).onChanged(errorMessage);
    }
}
