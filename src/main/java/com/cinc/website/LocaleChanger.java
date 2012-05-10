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
import javax.enterprise.context.ApplicationScoped;

@Named("localeChanger")
@ApplicationScoped
public class LocaleChanger {
    
    private String locale = "en";
    

    public String getLocale()
    {
        return locale;
    }
    
    public void setLocale(String value) { 
        this.locale = value;
    }
    
}
