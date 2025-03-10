import React from 'react'
import SectionHeader from '../components/elements/SectionHeader'

const Project = () => {
  const defaultValues = { id: '', title: '', description: '', status: '2', startDate: '', endDate: '', projectManager: '', clientId: '' , productId: '' }
    const [project, setProject] = useState(defaultValues)  

       
    return (
        <main id= "project">
            <div className='container'>
            <SectionHeader title={`PROJECT ${id} - ${title === '' ? 'Skapa nytt' : id}`}/>
            </div>
        </main>
    
)
}


export default Project