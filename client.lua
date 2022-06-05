local isDriving = false;
local isUnderwater = false;
local hasCinematic = false;
local ver = true;
local isPaused = false;
local mapa = false;

ESX = nil

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        end
        Wait(100)
end)


Citizen.CreateThread(function()
    while true do
        Wait(1000)

        if IsPedSwimmingUnderWater(PlayerPedId()) then
            isUnderwater = true
            SendNUIMessage({showOxygen = true})
        elseif not IsPedSwimmingUnderWater(PlayerPedId()) then
            isUnderwater = false
            SendNUIMessage({showOxygen = false})
        end
        TriggerEvent('esx_status:getStatus', 'hunger',
                     function(status) hunger = status.val / 10000 end)
        TriggerEvent('esx_status:getStatus', 'thirst',
                     function(status) thirst = status.val / 10000 end)
        if Config.ShowStress == true then
            TriggerEvent('esx_status:getStatus', 'stress',
                         function(status) stress = status.val / 10000 end)
        end

        if (Config.nomapa) then
            if IsPedSittingInAnyVehicle(PlayerPedId()) then
                DisplayRadar(true)
            else
                DisplayRadar(false)
            end
        else
            DisplayRadar(true)
        end
        if IsPauseMenuActive() and not isPaused then
            isPaused = true
            ver = false
            ExecuteCommand("chud")
        elseif not IsPauseMenuActive() and isPaused then
            isPaused = false 
            ver = true
            ExecuteCommand("chud")
        end
        Wait(200)


        SendNUIMessage({
            action = "update_hud",
            hp = GetEntityHealth(PlayerPedId()) - 100,
            armor = GetPedArmour(PlayerPedId()),
            hunger = hunger,
            encoche = IsPedSittingInAnyVehicle(PlayerPedId()),
            thirst = thirst,
            stress = stress,
            oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10,
            slidecoche = Config.slidecoche,
            useLogo = Config.UsarLogo,
            logo    = Config.Logo
        })
        if IsPauseMenuActive() then
            SendNUIMessage({showUi = false})
        elseif not IsPauseMenuActive() then
            SendNUIMessage({showUi = true})
        end
    end
end)



RegisterCommand("hud",
                function()  SendNUIMessage({action = "toggle_hud"}) end, false)
