/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cinc.website;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

/**
 *
 * @author nicolas
 */
@Named
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
