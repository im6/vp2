def getLikeList(session):
    result = session.get('likes', [])
    if 'likes' in session:
        del session['likes']
    return result