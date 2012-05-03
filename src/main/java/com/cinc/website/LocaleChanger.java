/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cinc.website;

/**
 *
 * @author nicolas
 */

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;
import java.util.Locale;

@Named("localeChanger")
@RequestScoped
public class LocaleChanger {
    
    public String setLocale(String value) {
        
        
        UIViewRoot viewRoot = FacesContext.getCurrentInstance().getViewRoot();
        viewRoot.setLocale(new Locale(value));
        
        return null;
    }
    
}
