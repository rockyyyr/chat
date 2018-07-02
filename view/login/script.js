$(() => {
  const error = new URL(location.href).searchParams.get('error')

  if(error) {
    $('#message').html('
      <p class="text-danger">There was an error logging in...</p>
    ')
  }
})
