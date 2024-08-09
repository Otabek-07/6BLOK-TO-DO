import { useState } from "react"

const App = () => {

  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTitle, setCurrenTitle] =useState("")

  const addTask = (e) => {
    e.preventDefault(); 
       const newTask = {
           title:title,
           created_at:Date.now(),
           isDone:false,
           id:Date.now()      
       };

       if(newTask.title.trim().length){
         setTodo([...todo,newTask]);
         setTitle('')
       } else{
         alert("please fiil input")
       }
  } 
   

  const deleteTassk = (id) => {
     const currentTodo = todo.filter((item) => item.id!==id)
     setTodo(currentTodo)
  }


  const editTask=(id, val) => {
     setCurrenTitle(val);
     setShowModal(true);
     localStorage.setItem("todoId", id);
  }


  const saveEdited = () => {

    let id = localStorage.getItem("todoId")
    todo.forEach((item) => {
      if(item.id == id){
          item.title = currentTitle;
          setShowModal(false)
      }
})
  }

 const modalStyle={
     display: showModal ? "flex" : "none"
 }

  return (
    <main>

      <section id='main'>
      
      <div style={modalStyle} className="modal-wrapper">
        <div className="modal-content">
        <i onClick={() =>setShowModal(false)} className="bi bi-x-lg close"></i>
           <form action="#">
               <input value={currentTitle} onChange={(e) => setCurrenTitle(e.target.value)} type="text" placeholder="Enter new title"/>
           </form>

           <div className="flex btn-group">
               <button onClick={saveEdited} className="save">Save</button>
               <button onClick={() =>setShowModal(false)} className="cancel">Cancel</button>
           </div>
             
        </div>
      </div>
          <div className='container mx-auto'>
              <div className="todo-card my-8 mx-auto bg-slate-100 w-[600px ] p-3">
                  <form onSubmit={addTask } className='p-3 border flex justify-betweenm gap-x-2'>
                      <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" placeholder='Enter task title' className='grow p-2'/>
                      <button type='submit' className='bg-indigo-500 px-3 text-white rounded-sm focus:ring-2'>Add task</button>
                  </form> 
                  <table className='bg-slate-500 w-full text-center'>  
                      <thead className='bg-white text-indigo-700'>
                          <tr>
                             <th>N</th>
                             <th>Title</th>
                             <th>Created</th>
                             <th>Edit</th> 
                             <th>Delete</th> 
                          </tr>
                      </thead>
                      <tbody className='bg-slate-200'>
                         {
                           todo.map((item, index) => {
                            return (
                              <tr className="tr h-[50px]" key={item.id}>
                              <td>{index+1}</td>
                              <td>{item.title}</td>
                              <td>{item.created_at}</td>
                              <td>
                                <button onClick={()=>editTask(item.id, item.title)} className="bg-blue-500 px-3 text-white rounded-sm focus:ring-2 hover:bg-indigo-600">
                                  <i className="bi bi-pencil-square"></i> Edit
                                </button>
                              </td>
                              <td>
                                <button onClick={()=>deleteTassk(item.id)} className="bg-red-500 px-3 text-white rounded-sm focus:ring-2 hover:bg-red-600">
                                  <i className="bi bi-trash3-fill"></i> Delete
                                </button>
                              </td>
                            </tr>
                            )
                          })
                         }
                      </tbody>
                  </table>
              </div>
          </div>

      </section>
    </main>
  )
}

export default App


