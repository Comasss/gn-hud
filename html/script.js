$(document).ready(function () {
  HealthIndicator = new ProgressBar.Circle("#HealthIndicator", {
    color: "rgb(255, 255, 255)",
    trailColor: "rgb(66, 66, 66, 0)",
    strokeWidth: 7,
    trailWidth: 7,
    duration: 250,
    easing: "easeInOut",
  });

  ArmorIndicator = new ProgressBar.Circle("#ArmorIndicator", {
    color: "rgb(255, 255, 255)",
    trailColor: "rgb(66, 66, 66, 0)",
    strokeWidth: 7,
    trailWidth: 7,
    duration: 250,
    easing: "easeInOut",
  });

  HungerIndicator = new ProgressBar.Circle("#HungerIndicator", {
    color: "rgb(255, 255, 255)",
    trailColor: "rgb(66, 66, 66, 0)",
    strokeWidth: 7,
    trailWidth: 7,
    duration: 250,
    easing: "easeInOut",
  });

  ThirstIndicator = new ProgressBar.Circle("#ThirstIndicator", {
    color: "rgb(255, 255, 255)",
    trailColor: "rgb(66, 66, 66, 0)",
    strokeWidth: 7,
    trailWidth: 7,
    duration: 250,
    easing: "easeInOut",
  });



  OxygenIndicator = new ProgressBar.Circle("#OxygenIndicator", {
    color: "rgb(255, 255, 255)",
    trailColor: "rgb(66, 66, 66, 0)",
    strokeWidth: 7,
    trailWidth: 7,
    duration: 250,
    easing: "easeInOut",
  });

});

window.addEventListener("message", function (event) {
  let data = event.data;
 
  if (data.useLogo) {
    $("#logoserver").fadeIn(300)
    $("#logoserver").html(`<img src="${data.logo}" id ="logoserver">`)
  } else if (!!data.useLogo) {
    $("#logoserver").fadeOut(300)
  }

  if (data.action == "update_hud") {
    HealthIndicator.animate(data.hp / 100);
    ArmorIndicator.animate(data.armor / 100);
    HungerIndicator.animate(data.hunger / 100);
    ThirstIndicator.animate(data.thirst / 100);
    OxygenIndicator.animate(data.oxygen / 100);
  }

  if (data.showOxygen == true) {
    $("#OxygenIndicator").show(500);
  } else if (data.showOxygen == false) {
    $("#OxygenIndicator").hide(500);
  }

  // Flash if thirst is low
  if (data.thirst < 25) {
    $("#ThirstIcon").toggleClass("flash");
  }
  // Flash if hunger is low
  if (data.hunger < 25) {
    $("#HungerIcon").toggleClass("flash");
  }
  
  if (data.hp < 25) {
    $("#hp-icon").toggleClass("flash");
  }
  
  if (data.slidecoche){
    if(event.data.encoche){
        $("#ThirstIndicator").animate({"left": '28vh', "bottom":'3vh'},200 );
        $("#HungerIndicator").animate({"left": '28vh', "bottom":'3vh'},200 );
        $("#HealthIndicator").animate({"left": '28vh', "bottom":'3vh'},200 );
        $("#ArmorIndicator").animate({"left": '28vh', "bottom":'3vh'},200 );
    }else if(!event.data.encoche){
        $("#ThirstIndicator").animate({"left": '0.7vh', "bottom":'0.7vh'},350 );
        $("#HungerIndicator").animate({"left": '0.7vh', "bottom":'0.7vh'},350 );
        $("#HealthIndicator").animate({"left": '0.7vh', "bottom":'0.7vh'},350 );
        $("#ArmorIndicator").animate({"left": '0.7vh', "bottom":'0.7vh'},350 );
    }
}

  if (data.armor < 25) {
    $("#armor-icon").toggleClass("flash");
  }

  if (data.showUi == true) {
    $(".container").show();
  } else if (data.showUi == false) {
    $(".container").hide();
  }

  if (data.action == "toggle_hud") {
    $("body").fadeToggle()
  }
});
