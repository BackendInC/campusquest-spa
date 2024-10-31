# Quest Campus - Frontend Documentation

![Bee avatar](./public/avatar.svg)

## Application Views

- **Opening screen**: Campus appears in the frame and camera starts moving upwards, where a bee flies over leaving "Quest Campus" inscription behind itself as a trace. Login and register buttons appear if started for the first time.

- **Registration**: Collect name, email, university ID card photo, avatar, preferred campuses.

- **Avatar customization**: Every user has a bee as profile picture and it can be customized at any point. As user gets points from completing quests, wearable items can be aquired.

- **Quest page**: New quests shown in a list, calendar to see old quests and photos taken previous days. 

- **Gamified campus map**: Campus map enhanced with details and styled to match quest mood. Quest are shown on map and users can think of routes to minimize the walking distance.

- **Feed page**: Posts made by developers and friends.

- **Camera and photo editor**: Pictures can be taken for quest completion or just for fun. After a picture is taken, it can be decorated with text, location and friend tags, animated avatars.

- **Profile page**: Page with bee avatar, optionally a real photo (the two pictures shown as a flipping coin like on Instagram), friend count, quest stats, posts.

- **Buzz space**: All users within 15 meters are displayed with their avatars flying. Friend requests are made here.

- **Jigsaw puzzle**: A minigame where user solves a puzzle giving a picture taken by a random user.

- **Quest validation screen**: Some quests will require validation by other users before giving the reward.

- **Classes-related views**: Users can integrate their university schedule and courses with quests.
    - **Schedule**: Users upload their course schedule. It is saved to database, can be now viewed better from the app and class-related quests start to appear.
    - **Pop-up questions**: If user enters the class, they may get questions about lecture, in a similar manner with questions Google Maps ask to people taking a bus ride: "How crowded it is?", "When is the break?", "Was the attendance sheet given?", "Any important announcement?" etc.
    - **Note sharing**: Notes for a particular day and class can be submitted and viewed by public.

## Small details

- Bee avatars grow muscles as the user goes to gym
- Ridiculously rich list of location tags
- Algorithm to find the shortest route to complete all quests
- "MS Word Clippy"-like avatar jumpscares throughout app
- Bigger number of friends unlocks new quests that require validation by more people (quest validation is done by friends)
