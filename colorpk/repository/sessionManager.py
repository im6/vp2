def getLikeList(session):
    result = session.get('likes', [])
    if 'likes' in session: # if `likes` in session, means a user just logged in, pass and purge it afterward
        del session['likes']
    return result