RESTful Route

name         url                  verb         desc.
==============================================
INDEX        /campgrounds         Get        
New          /campgrounds/new     Get
Create       /campgrounds         POST
Show         /campgrounds/:id     Get

New          /campgrounds/:id/comments/new        Get
Create       /campgrounds/:id/comments            POST



##Add User Model
* Install all  packages for auth
* Define User model

#Auth Pt.2 - Register
*Configure passport
*Add register routes
*Add register template


##Auth Pt.3 -Login

*Add login routes
*Add login template


#User + comments

#User + campground
* prevent an unauthenticated user from creating a campground
* Save  username + id to newly created campground
* 

#Editing Campgrounds

*Add Method-Override
*Add Edit Route for campgrounds
*Add link to Edit page
*Add update Route
*Fix $set problem

#Delete Campgrounds
*Add Destroy Route
*Add Delete Button


#Authorization
*User can only edit his/her campground
*User can only delete his/her campground
*Hide/show edit and delete button


##Edit Comments
*Add Edit route for comments
*Add Edit button
*Add update button

#Delete Comments
*Add Destroy route
*Add Delete button