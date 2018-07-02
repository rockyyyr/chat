app.directive('headerBar', () => {
  return {
    templateUrl: 'components/HeaderBar.html'
  }
})

app.directive('chatWindow', () => {
  return {
    templateUrl: 'components/chatWindow.html'
  }
})

app.directive('message', () => {
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    templateUrl: 'components/message.html'
  }
})

app.directive('messageInput', () => {
  return {
    templateUrl: 'components/messageInput.html'
  }
})

app.directive('sidebar', () => {
  return {
    templateUrl: 'components/sidebar.html'
  }
})

app.directive('sidebarItem', () => {
  return {
    templateUrl: 'components/sidebarItem.html'
  }
})