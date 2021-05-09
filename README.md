# Smart Waste Segregator 

## Proposed Model 

The waste segregator system is a eco-friendly and social solution to lots of waste a person or a family does in its household. The application encourages users to recycle and reuse. The system consists of mainly of two components, trash can and mobile phone. Whenever user throws a trash, he can track what kind of trash he is utilizing regularly and explains user about how good or bad trash user is using. Also it suggest user to use less plastic waste if he/she is utilizing more plastics than usual. This way application is designed to provide a good motive to the people.

# Machine End 
There are lots of trash cans available which detect information of how a trash reflects itself and other little info which are detected by sensors attached on them. The system can be attached to those prebuilt trash cans which compile the information but don’t utilize it well.


![image](https://user-images.githubusercontent.com/52162363/117565627-d698f780-b0cf-11eb-9dc1-1b89a00264ac.png)


1. This part includes QR code : which generates Qr code for the id given in the input field. 
* In real case scenario Each trash bin will have their own id with their generated QR code which user can scan and start their session on mobile app. 
2. The Date and Time feature is also included on the screen for the convenience of user.
3. At the bottom right corner of the screen there's a **DATA** button, which directs user to the data screen of the trash bin as shown below 

![Capture](https://user-images.githubusercontent.com/52162363/117566128-722b6780-b0d2-11eb-9eec-9df60e0ab149.PNG)

* On this part of the page user can reach in two ways 
1. When QR is scanned through our sws website : Users keeping their track. 
2. By simply clicking on the **DATA** button for public use. 
* For location of the trash bin i have used positionstack API. 
*  A daily quote carousel is also added at the bottom of the screen to nudge the user on the current global climate crisis. 
#### Real Case Scenario
1. Each trash bin will have their own **unique ID and QR code**. 
2. On the second screen there will be **no** add button for specific materials they will be scanned by the machine itself and will be updated in the database. 

* Tasks still need to be done 
1. [] A dynamic end session on the screen when user end their session from the mobile app.
