app.controller('data', ($scope, $http, $compile, $location) => {

  const headers = { 'Authorization': 'Bearer ' + new URL(location.href).searchParams.get('token') }

  $http.get('/chat/init', { headers }).then(response => {

    if (response.data.error) {
      console.log(response.data.error)
      return
    }

    $scope.data = response.data
    $scope.data.chats.forEach(chat => {
      $http.get('/chat/' + chat.chatId + '/messages', { headers }).then(response => {

        if (response.data.error) {
          console.log(response.data.error)
          return
        }
        
        chat.messages = response.data
      })
    })
  })

  $http.get('config.json').then(response => $scope.config = response.data)

  $scope.formatDate = date => new Date(parseInt(date)).toDateString()
  $scope.currentTime = () => new Date().toTimeString()

  $(() => {
    const socket = io('/')
    const chatWindow = $('.chat-window')
    const chat = $('#chat')
    const send = $('#send')
    const sidebar = $('#sidebar')
    const message = $('#message-input')
    const userId = 1000

    message.keypress(event => {
      if (event.which == 13) {
        send.trigger('click')
      }
    })

    send.click(() => {
      if (message.val().length > 0) {
        socket.emit('message', {
          chatId: $scope.currentChatId,
          userId: userId,
          content: message.val()
        })
        message.val('')
      }
    })

    socket.on('message', data => {
      chat.append($compile(`
          <message message='{sent: ${data.userId === userId}, content: "${data.content}", timestamp: "${new Date(parseInt(data.timestamp)).toLocaleTimeString()}"}'></message>
      `)($scope))
      chatWindow.stop().animate({ scrollTop: chat[0].scrollHeight }, 1000)
      console.log(data.content)
    })

    socket.on('error', err => {
      alert(JSON.stringify(err))
    })


    $scope.appendMessage = function(data) {
      chat.append($compile(`
          <message message='{sent: ${data.userId === userId}, content: "${data.content}", timestamp: "${new Date(parseInt(data.timestamp)).toLocaleTimeString()}"}'></message>
      `)($scope))
      chatWindow.stop().animate({ scrollTop: chat[0].scrollHeight }, 1000)
    }


    $scope.visible = true

    $scope.loadMessages = userId => {
      const currentChat = $scope.data.chats.find(x => x.recipient === userId)
      $scope.currentChatId = currentChat.chatId

      chat.empty()

      currentChat.messages.forEach(message => {
        $scope.appendMessage(message)
      })
    }

  }) // End of onload
})
