function sortActivities(activities) {
  // TODO - set as default as soon as available?
  // var sort_by = "activity";
  var sortValue = "hotness-up";
  $(`li#sort > span > div > ul > li.active`).each(function(i) {
    sortValue = toValue($(this).text(),'sort');
    // console.log(`sort value ${$(this).text()}, label ${sortValue}`);
  });
  var sort_by = sortValue.split('-')[0];
  var direction = (sortValue.split('-')[1] == "up") ? 1 : -1;
  // console.log(`Sorting by ${sort_by}, direction ${direction}`);

  if (sort_by == "hotness") {
    activities.sort(function (a, b) {
      if (!a || !b || !a.cumulativeGitHubStats || !b.cumulativeGitHubStats) {
        return 0;
      } else if (!a || !a.cumulativeGitHubStats) {
        return -1;
      } else if (!b || !b.cumulativeGitHubStats) {
        return 1;
      } else {
        var ret = -1;
        if (
          a.cumulativeGitHubStats.hotness < 
          b.cumulativeGitHubStats.hotness) {
          ret = 1;
        }
        return ret*direction;
      }
    });
  } else if (sort_by == "name") {
    activities.sort(function (a, b) {
      console.log('sorting...');
      console.log(a);
      console.log(b);
      if (a.activityName.toLowerCase() < b.activityName.toLowerCase()) return -1*direction;
      if (b.activityName.toLowerCase() < a.activityName.toLowerCase()) return 1*direction;
      return 0;
    });
  // TODO - as soon as "updated_at" field is in activities.json
  // } else {
  //   activities.sort(function (a, b) {
  //     var a_updated = a['repos'].sort(function(a1,b1) {
  //       return new Date(b1.updated_at).getTime() - new Date(a1.updated_at).getTime() 
  //     })[0].updated_at;
  //     var b_updated = b['repos'].sort(function(a1,b1) { 
  //       return new Date(b1.updated_at).getTime() - new Date(a1.updated_at).getTime() 
  //     })[0].updated_at;

  //     if (a_updated < b_updated) return 1;
  //     if (b_updated < a_updated) return -1;
  //     return 0;
  //   });          
  }
}
