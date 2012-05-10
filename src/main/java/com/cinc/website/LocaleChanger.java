/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cinc.website;

/**
 *
 * @author nicolas
 */

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ApplicationScoped;

@ManagedBean
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
