package com.quantity.measurement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping(value = {
        "/",
        "/dashboard",
        "/converter",
        "/calculator",
        "/comparison",
        "/error"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
