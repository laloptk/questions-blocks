=== ESNext ===
Contributors: Eduardo Sanchez
Tags: block
Tested up to: 5.7.0
Stable tag: 0.0.2
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Questions and Answers plugin

## Description

This is a WordPress plugin that is still in the making. The plan is to create several question and answer blocks. The editor should be able to place questions with a respective right answer, and the user should be able to respond to those questions in the frontend of the website.

The planned blocks, until now, are the following:

1. True or false question
1. Multiple choice (with a single answer) question
1. Multiple choice (with several answers) question
1. "Fill the blank spaces" question
1. Question from an image, video or document (This might be redundand because we can give the option to place a media file to all questions)


If you install the plugin you can add true/false and multiple choice question blocks that if you use you will see in the front end. The other question blocks partially work but they are incomplete. Also, one important thing to do is to store the answers by user and create a dashboard page where the results are shown.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/questions-and-answers` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

## Start development

Once the plugin is installed, you only need to go to the plugin's root folder (in the terminal) and run `npm i` followed by `npm start`.
