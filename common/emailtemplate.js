var utils = require('../common/utils');
var path = require('path');
var emailfile = require('../common/email');
var emailReminder = require('../common/emailPromise');
var url = require('url');

function user_follow(email,first_name,followerId,req,res) {
    let hostname = url;
    let link = "http://" + hostname;
    console.log(hostname,"req.headers.host");
    utils.convertPug(path.join(__dirname, '../templates/follow.pug'), { name: first_name, link: link,follow:followerId})
        .then(content => {
              emailfile.send(res, email, 'A User is Now following you', content);
              res.on('end', function(){
                ({ "error": false, "Message": "User has been Registerd successfully" });
              });
            })
          .catch(err => console.log(err));
          return false;
}

function user_comment(email,Reciever_firstName,userName,req,res){
  let hostname = req.headers.host;
  let link = "http://" + hostname;
  utils.convertPug(path.join(__dirname, '../templates/comments.pug'), { name: Reciever_firstName, link: link,comment:userName})
      .then(content => {
            emailfile.send(res, email, 'Comment on Your Post', content);
            res.on('end', function(){
              ({ "error": false, "Message": "comment Added successfully" });
            });
          })
        .catch(err => console.log(err));
        return false;
}

function user_follow_forum(email,first_name,req, res){
  let hostname = req.headers.host;
  let link = "http://" + hostname;
  utils.convertPug(path.join(__dirname, '../templates/acknowledgeCommunity.pug'), { name: first_name, link: link})
      .then(content => {
        emailfile.send(res, email, ''+first_name+'You have an Update from a Peersview Post you are following', content);
        res.json
          ({ "error": false, "Message": "Thread Follow successfully" });
      })
        .catch(err => console.log(err));
        return false;
}

function event_notifications(email,first_name,req, res){
  let hostname = req.headers.host;
  let link = "http://" + hostname;
  utils.convertPug(path.join(__dirname, '../templates/follow_forum.pug'), { name: first_name, link: link})
      .then(content => {
        console.log(content);
            emailfile.send(res, email, 'Event NoticeEvent Updated', content);
            res.json
              ({ "error": false, "Message": "Event Updated successfully" });
          })
        .catch(err => console.log(err));
        return false;
}

 function user_unread_message(reciever_email,reciever_name,sender_name,req,res){
    let hostname = req.headers.host;
    let link = "http://" + hostname;
    utils.convertPug(path.join(__dirname, '../templates/unreadmssage.pug'), { name:sender_name,reciever_name:reciever_name,link: link})
        .then(content => {
          console.log(content);
              emailfile.send(res, reciever_email, 'You have an unread Message', content);
              res.on('end', function(){
                ({ "error": false, "Message": "Message Send successfully" });
              });
            })
          .catch(err => console.log(err));
          return false;
    }

  function user_approved(user_email,user_name,institutions_Name,req,res) {
      let hostname = url;
      let link = "http://" + hostname;
      console.log(hostname,"req.headers.host");
      utils.convertPug(path.join(__dirname, '../templates/acknowledgeCommunity.pug'), { name: user_name, link: link,institutionsName:institutions_Name})
          .then(content => {
                emailfile.send(res, user_email, ''+user_name+' Welcome To Online Campus ', content);
                res.on('end', function(){
                  ({ "error": false, "Message": "User approved successfully" });
                });
              })
            .catch(err => console.log(err));
            return false;
    }

  function user_follow_thread(reciever_email,reciever_first_name,sender_firstName,req,res){
    let hostname = url;
    let link = "http://" + hostname;
    console.log(hostname,"req.headers.host");
    utils.convertPug(path.join(__dirname, '../templates/user_follow_thread.pug'), { name: reciever_first_name, link: link,sender_Name:sender_firstName})
        .then(content => {
              emailfile.send(res, reciever_email, ''+sender_firstName+' is Following Your Peersview Page', content);
              res.on('end', function(){
                ({ "error": false, "Message": "User follow successfully" });
              });
            })
          .catch(err => console.log(err));
          return false;
  }

  function user_thread_updated(reciever_email,reciever_name,req,res){
    let hostname = url;
    let link = "http://" + hostname;
    console.log(hostname,"req.headers.host");
    utils.convertPug(path.join(__dirname, '../templates/follow_forum.pug'), { name: reciever_name, link: link})
        .then(content => {
          console.log(content,reciever_email,reciever_name);
              emailfile.send(res, reciever_email, 'You have an Update from a Peersview Post you are following ', content);
              res.on('end', function(){
                ({ "error": false, "Message": "User Updated successfully" });
              });
            })
          .catch(err => console.log(err));
          return false;
      }

  function community_reminder_email(reciever_email,reciever_name,req,res){
    let hostname = url;
    let link = "http://" + hostname;
    utils.convertPug(path.join(__dirname, '../templates/reminderCampus.pug'), { name: reciever_name, link: link})
        .then(content => {
              emailReminder.sendReminder(res, reciever_email, 'Reminder to Join Peersview.com', content);
              console.log("User approved Successfulyy");
            })
          .catch(err => console.log(err));
          return false;
      }

  function morning_emails(reciever_email,reciever_name,liker_name,recent_post,new_headlines,top_stories,req,res){
    let hostname = url;
    let link = "http://" + hostname;
    utils.convertPug(path.join(__dirname, '../templates/morning.pug'), { name: reciever_name,liker_name:liker_name,recent_post:recent_post,recent_headlines:new_headlines,story:top_stories,link: link})
        .then(content => {
           emailReminder.sendReminder(res, reciever_email, 'Don’t miss out on Latest /Top News Headline, Posts and Stories', content);
              console.log("Invitation Send Successfulyy");
            })
          .catch(err => console.log(err));
          return false;
      }

  function evening_emails(rec_email,rec_name,visiter_name,Campus_Notifications,topStory_title,institutionsName,event_institutionName,event_title,event_startdate,event_address,req,res){
    let hostname = url;
    let link = "http://" + hostname;
    utils.convertPug(path.join(__dirname, '../templates/evening.pug'),{name:rec_name,visiter_name:visiter_name,notify:Campus_Notifications,story:topStory_title,institutionsName:institutionsName,eventName:event_institutionName,title:event_title,start_date:event_startdate,place:event_address,visiter_name:visiter_name,link: link})
        .then(content => {
          console.log(content);
          emailReminder.sendReminder(res, rec_email, 'Don’t miss out on Latest /Top News Headline, Posts and Stories', content);
              console.log("Invitation Send Successfulyy");
            })
          .catch(err => console.log(err));
          return false;
      }

  function topUser_credits_emails(reciever_email,reciever_name,req,res){
    let hostname = url;
    let link = "http://" + hostname;
    utils.convertPug(path.join(__dirname, '../templates/morning.pug'), { name: reciever_name,link: link})
        .then(content => {
          console.log(reciever_email,reciever_name);
          return false;
           emailReminder.sendReminder(res, reciever_email, 'Don’t miss out on Latest /Top News Headline, Posts and Stories', content);
              console.log("Invitation Send Successfulyy");
            })
          .catch(err => console.log(err));
          return false;
      }

module.exports = {
    user_follow: user_follow,
    user_comment:user_comment,
    user_follow_forum:user_follow_forum,
    user_unread_message:user_unread_message,
    user_approved:user_approved,
    user_follow_thread:user_follow_thread,
    user_thread_updated:user_thread_updated,
    community_reminder_email:community_reminder_email,
    morning_emails:morning_emails,
    evening_emails:evening_emails,
    topUser_credits_emails:topUser_credits_emails,
}
