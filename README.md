# Django-React-Blog
This is a "Blogging Platform" which gives all general features a blog should have.

The backend is completely build on Django using Django Rest Framework, while the frontend is completed using ReactJS.
### Features
* Login/Registration
* Minimal Design
* Create/Edit/Delete Your Posts
* User Profile
* Comment Enable
* Admin Panel
	* Create/View/Edit/Delete A User
	* Create/View/Edit/Delete A Post By Any User
	* View/Edit/Delete All Comments In The Blog
	* View/Edit/Delete All Comments To A Specific Post
	* Publish/Unpublish A Post

## Backend Setup
1. Clone this repository: `git clone https://github.com/dojutsu-user/Django-React-Blog.git`.
2. Change the current directory to `backend` folder: `cd ./Django-React-Blog/backend/`.
3. Create a virutal environment and install all backend dependencies with pipenv: `pipenv install`.
4. Start the virtual environment: `pipenv shell`.
5. Change the working directory to `blog_backend` which contains the `manage.py` file: `cd ./blog_backend`.
6. Run `python manage.py makemigrations`.
7. Run `python manage.py migrate`.
8. Create a superuser: `python manage.py createsuperuser`
9. Run the server: `python manage.py runserver`.

## Frontend Setup
1. Navigate the current working directory to `blog_frontend`: `cd ./Django-React-Blog/frontend/blog_frontend/`.
2.  Install the all frontend dependencies using npm: `npm install`.
3.  Run the server: `npm start`.

### Creating The First Post
1. Make sure that both Backend and Frontend Servers are running.
2. Open your browser and navigate to [localhost:3000](localhost:3000).
3. Go To [http://localhost:3000/login/](http://localhost:3000/login/).
4. Login with the superuser credentials created while setting up the Backend (Step: 8)
5. Navigate To *Dashboard -> Create New Post* ([http://localhost:3000/dashboard/create-new-post](http://localhost:3000/dashboard/create-new-post)).
6. Fill the form to create a new post and then Submit it.
7. The submitted post will not appear on the homescreen unless and until the admin approves it.
8. To approve the post, go to *Dashboard -> Admin Panel -> View All Posts* and then click on *Edit* Button.
9. Check the checkbox labelled *Published* and then submit.
10. After the post gets published, it will be displayed on the homepage of the blog ([localhost:3000](localhost:3000)).
11. Note: *Once the post gets published, the user can only edit the post from the Dashboard, however, the admin still can edit/delete the post from the Admin Panel*

## Backend API Documentation
API Documentation is generated using the default tool provided by Django Rest Framework.

### View The API documentation
1. Make sure that the Backend Server is running.
2. Navigate to the [localhost:8000/docs/](localhost:8000/docs/)

## Screenshots
![screencapture-localhost-3000-2018-08-09-00_55_39](https://user-images.githubusercontent.com/29149191/43859744-2d0d54d6-9b6f-11e8-9bc9-c9f3a81c66af.png)
=
![screencapture-localhost-3000-dashboard-create-new-post-2018-08-09-00_51_40](https://user-images.githubusercontent.com/29149191/43859585-ac2a47b6-9b6e-11e8-8ec3-86aaa4d51bfe.png)
=

![screencapture-localhost-3000-admin-panel-2018-08-09-00_51_25](https://user-images.githubusercontent.com/29149191/43859586-ac6b43ce-9b6e-11e8-993d-1f6c0b29ef2a.png)
=
![screencapture-localhost-3000-posts-view-consequat-mauris-nunc-congue-ni-2018-08-09-00_49_53](https://user-images.githubusercontent.com/29149191/43859587-acacdbfe-9b6e-11e8-8d99-835f4e18dfbc.png)
=
![screencapture-localhost-3000-login-2018-08-09-00_21_50](https://user-images.githubusercontent.com/29149191/43859588-aced0602-9b6e-11e8-9b6a-317ac39cf0ff.png)
=
![screencapture-localhost-3000-dashboard-2018-08-09-00_54_56](https://user-images.githubusercontent.com/29149191/43859745-2d61b030-9b6f-11e8-9c49-90e08c054647.png)
=
![screencapture-localhost-3000-register-2018-08-09-17_26_33](https://user-images.githubusercontent.com/29149191/43897437-9ae18b46-9bf9-11e8-8a20-ad5c5c628963.png)
=
