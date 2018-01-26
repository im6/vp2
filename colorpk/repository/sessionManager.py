def addToLikeList(session, id):
    likes = session.get('likes', [])
    likes.append(id)
    session['likes'] = likes

def removeFromLikeList(session, id):
    likes = session.get('likes', [])
    likes = [i for i in likes if i != id]
    session['likes'] = likes