/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cinc.website;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;

/**
 *
 * @author nicolas
 */
@ManagedBean
@SessionScoped
public class User implements Serializable{
    
    
    private String email;
    private String password;
    
    
    public void setEmail(String value)
    {
        this.email = value;
    }
    
    public void setPassword(String value)
    {
        this.password = value;
    }
    
    public String getEmail() 
    {
        return this.email;
    }
    
    public String getPassword()
    {
        return this.password;
    }
    
    public String login()
    {
        
        return null;
    }
            
}
