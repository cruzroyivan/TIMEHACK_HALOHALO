<template>
  <div id="show-users-test">
    <h1>Show Users Test</h1>
    <div>
      <table style="width:100%">
        <tr>
          <th>Employee ID</th>
          <th>Last Name</th>
          <th>First name</th>
          <th>Middle name</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Contact Number</th>
          <th>Email Address</th>
          <th>Password</th>
        </tr>
        <tr v-for="user in users">
          <td>{{user.employeeId}}</td>
          <td>{{user.name.last}}</td>
          <td>{{user.name.first}}</td>
          <td>{{user.name.middle}}</td>
          <td>{{user.department}}</td>
          <td>{{user.designation}}</td>
          <td>{{user.mobileNumber}}</td>
          <td>{{user.emailAddress}}</td>
          <td>{{user.password}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  methods: {

  },
  created() {
    this.$http.get('http://localhost:8085/timehack/halohalo/all/employee').then(function(data){
      console.log(data);
      this.users = data.body.records.slice(0,10);

    })
  }
}
</script>

<style>
  table, th, td {
    border: 1px solid black;
  }
</style>
