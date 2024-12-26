/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const forgetPassword = async email => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
      email: email
    })
    toast.success('Email sent successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}

export const resetPassword = async (token, passwordd) => {
  console.log('Token:', token);
  console.log('New Password:', passwordd);

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
      token: token,
      password: passwordd
    });
    toast.success('Password reset successfully!');
    return response.data;
  } catch (error) {
    toast.error('An error occurred. Please try again.');
    console.error('Error details:', error);
    throw error;
  }
};


/* export const verify2FAFunc = async (email, code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/verify-code`, {
      email: email,
      code: code
    })

    return response.data
  } catch (error) {
    toast.error(error.response.data.message)

    throw error
  }
} */

export const getUsers = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data
  } catch (error) {
    throw error
  }
}
export const deleteUsers = async id => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('User deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const addAssistantMember = async data => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Assistant member added successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const destroyUser = async userId => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/user/delete/${userId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const loginfunc = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: email,
      password: password
    })
    return response.data
  } catch (error) {
    throw error
  }
}
export const twoFactor = async (email, code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/two-factor-auth`, {
      email: email,
      code: code
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (userId, updatedData) => {
  const accessToken = localStorage.getItem('accessToken')

  try {
    const response = await axios.put(`${API_BASE_URL}/api/user/update/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('User profile updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}

export const updatePassword = async (userId, updatedData) => {
  console.log('userId:', userId); // Ajoutez cette ligne
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.put(`${API_BASE_URL}/api/user/${userId}/password`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    toast.success('Password updated successfully!');
    return response.data;
  } catch (error) {
    toast.error('An error occurred. Please try again.');
    throw error;
  }
};


export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/logout`)

    return response
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error)
  }
}

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/register`, {
      username,
      email,
      password
    })

    return response
  } catch (error) {
    throw error
  }
}


export const fetchUserData = async () => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/auth/loadMe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Invalid token or session expired')
    } else {
      console.error('An error occurred:', error)
    }
    return null
  }
}
export const getAllContact = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // Obtenir le jeton du localStorage
    console.log('Token:', token);

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_BASE_URL}/api/contact`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le jeton aux en-têtes
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
export const updateContact = async (id, data) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/contact/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    toast.success('Contact updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}

export const deleteContact = async id => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Contact deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const createNotification = async content => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/notifications`, { content })

    return response.data
  } catch (error) {
    throw error
  }
}

export const markNotificationAsRead = async id => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/notifications/${id}/markAsRead`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteNotification = async id => {
  try {
    await axios.delete(`${API_BASE_URL}/api/notifications/${id}`)
  } catch (error) {
    throw error
  }
}

export const markAllNotificationsAsRead = async () => {
  try {
    await axios.put(`${API_BASE_URL}/api/notifications/markAllRead`)
  } catch (error) {
    throw error
  }
}

export const getPaginatedNotifications = async (page, pageSize) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/notifications/getpaginated?page=${page}&pageSize=${pageSize}`)

    return response.data
  } catch (error) {
    throw error
  }
}

///Team Section
export const getAllReservations = async (page, limit, accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reservation?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}
export const getAllReviews = async (page, limit, accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/review?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}
export const getAllReviewsApprouved = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/review/approved`, {
      
    })

    return response.data
  } catch (error) {
    throw error
  }
}
export const approveReview = async (id) => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    toast.error('No access token found. Please log in again.')
    return null
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/review/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    toast.success('Review status updated successfully!')
    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const updateReservationStatus = async id => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/reservation/status/${id}`)
    toast.success('Reservation status updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const updateTeamMember = async (id, data) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/team/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Team member updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}

export const deleteReservation = async id => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/reservation/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Reservation deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}
export const deleteReview = async id => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/review/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Review deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}


// FAQ Section
export const getFAQs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/faq/`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const addFAQ = async data => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/faq/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Faq added successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}

export const updateFAQ = async (id, data) => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/faq/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Faq updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}

export const deleteFAQ = async id => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/faq/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Faq deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

// Blog Section
export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blog/`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const addBlog = async data => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/blog`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Blog added successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const updateBlog = async (id, data) => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/blog/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Blog updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const deleteBlog = async id => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Blog deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

//Partners Section

export const getPartners = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/partner/`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getOnePartner = async partnerId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ourpartners/${partnerId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const addPartner = async data => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/partner/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Partner added successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const updatePartner = async (partnerId, data) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/partner/${partnerId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Partner updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const deletePartner = async partnerId => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/partner/${partnerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Partner deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

//What We Do Section


export const getActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/service/`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getOneActivity = async activityId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/service/${activityId}`)

    return response.data
  } catch (error) {
    throw error
  }
}
export const addActivity = async data => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/service`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Services added successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

// Example of using axios to update an existing activity
export const updateActivity = async (id, data) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/service/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Service updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')

    throw error
  }
}


export const deleteActivity = async activityId => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/service/${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Service deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const getProject = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/featuredProjects/`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getOneProject = async projectId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/featuredProjects/${projectId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const addProject = async data => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/featuredProjects/addFeaturedProjects`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Project added successfully!')
    console.log(response)

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const updateProject = async (projectId, data) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/featuredProjects/${projectId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Project updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const deleteProject = async projectId => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/featuredProjects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Project deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

//Who We Are Section

export const getWhoWeAreEntries = async lang => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/whoweare/${lang}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const addWhoWeAreEntry = async data => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/whoweare/addWhoWeAre`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Who we are section added successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const updateWhoWeAreEntry = async (entryId, data) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/api/whoweare/${entryId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Who we are section updated successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}

export const deleteWhoWeAreEntry = async entryId => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/whoweare/${entryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    toast.success('Who we are section deleted successfully!')

    return response.data
  } catch (error) {
    toast.error('An error occurred. Please try again.')
    throw error
  }
}
