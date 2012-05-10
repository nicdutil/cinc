/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cinc.website;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.faces.context.ExternalContext;
import java.util.*;
/**
 *
 * @author nicolas
 */

@Named
@RequestScoped
public class TextInfo {
    
    private String show ="default";
    
    public void setShow(String value)
    {
        this.show = value;
    }
    
    public String getShow()
    {
        Map<String, String> reqParams = FacesContext.getCurrentInstance()
                                        .getExternalContext().getRequestParameterMap();
        String newSection = reqParams.get("section");
        if (newSection != null)
            show = newSection;
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
