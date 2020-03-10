# Hazard Mapper specification

### Overall functionality
The main function of the project is to get an easily accessible web based solution for natural hazard zonation and risk assessment.
For the MVP of the project, it focuses on mainly on creating <b>landslide hazard</b> zonation and displaying it to the user.

### Technical details
Technical details can be broken down to 3 different main topics:
1. <b>Backend</b> <br> API with ASP.NET CORE 
2. <b>Data</b> <br> MSSQL and File geodatabase
3. <b>UI</b> <br> React SPA is the core of the UI with a heavy use of react-leaflet
<br><br>
<b>Additional details</b><br>
<br> Role based authentication/authorization will be used, a JWT token will handle the access. Roles : User, Admin  


### Features
* Responsive design
* 5 pages should be accessable, 1 of those for admin only. They are the home page, login page, register, forgot password and the admin page.
* Home page should contain a navbar, a map, and some additional information on the map that is displayed
* The map itself should be interactive, it should be able to be zoomable, a legend should be displayed when needed. The different hazard zones should display some statistics when hovered over.
* On page load, the user should be prompted to allow to use current location, if they allow it, the map should be zoomed to that location, otherwise a general area should be displayed first.
* Locations can be found by basic interaction of the map, zooming, moving, etc. But, an input field also will be available where they can give lat/lng or major known locations (country, city etc.)
* 2 major modes will be available, changeable by a clear and visible button at the top of the map. Hazard assessment mode and edit mode.
* Hazard assessment mode is the main functionality of the project, after selecting a location, a button should be visible, which, after clicked it should calculate the landslide hazard zonation for the current visible map (up to a maximum distance from the middle, which will be later presented after performance tests). While calculation is in progress, a spinner should be visible. After the calculation, the zones should be visible clearly, and a legend should appear with the related information.
* After a zonation is calculated, the user should have the option to enter edit mode. Edit mode is only accessable for logged in users.
* While in edit mode, zonation calculation button is not visible, and the user now has the option to put markers, draw polygons, add buffers, specify threshold for zonation and to calculate their selected points/polygons in regard of the current zonation. They should receive insights to their selected entities, like distance from the closes zone, if there is an intersection, display area, etc.
* User should get clear instructions at all parts, about events, like calculation completed (toastr for example), and also directions, nothing should be visible that arent used, hoverable infos should be visible for buttons an inputs, and an example steps should also be visible.
* Admin page will be a form, where admins can submit additional historical data, that will help with the precision of the calculation.
* If a selected area will have insufficient data, calculation will not be made, and a notification shall be given to the user, that due to not reliable calculation, zonation can't be made at that location.
* Register form consists of a username, password, password again, email, country, vocation fields.
