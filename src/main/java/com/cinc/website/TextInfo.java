/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cinc.website;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;

/**
 *
 * @author nicolas
 */

@Named
@RequestScoped
public class TextInfo {
    
    private String show ="";
    
    public void setShow(String value)
    {
        this.show = value;
    }
    
    public String getShow()
    {
        return this.show;
    }
    
    public boolean isShow(String value)
    {
       if (show.compareTo(value) == 0)
           return true;
       else
           return false;
        
    }
    
    
}
