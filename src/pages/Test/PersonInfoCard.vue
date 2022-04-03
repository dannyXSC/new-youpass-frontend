<template>
  <b-card border-variant="success">
    <b-card-header style="font-size: 2em">About Me</b-card-header>
    <b-card-body>
      <b-row>
        <b-col cols="3">
          <b-card-img-lazy left src="https://picsum.photos/125/125/?image=58" height="200"
                           width="200"></b-card-img-lazy>
        </b-col>
        <b-col>
          <b-card-text style="font-size: 2.5em;color: #0ba360">{{ personInfo.name }}</b-card-text>
          <b-card-text style="font-size: 1.5em">学号:{{ personInfo.id }}</b-card-text>
          <b-card-text style="font-size: 1.5em">邮箱:{{ personInfo.email }}</b-card-text>
          <b-card-text style="font-size: 1.5em">家庭住址:{{ personInfo.location }}</b-card-text>
        </b-col>
        <b-col>
          <b-dropdown squared variant="success" style="float: right" dropleft text="修改个人信息" class="m-2">
            <b-dropdown-form>
              <b-form-group label="昵称">
                <b-form-input placeholder="nickname">

                </b-form-input>
              </b-form-group>

              <b-form-group label="密码">
                <b-form-input placeholder="password">

                </b-form-input>
              </b-form-group>

              <b-form-group label="邮箱">
                <b-form-input placeholder="email">

                </b-form-input>
              </b-form-group>
              <b-button variant="success" >提交</b-button>
            </b-dropdown-form>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "PersonInfoCard",
  data() {
    return {
      personInfo: {
        id: this.$store.state.global.id,
        name: this.$store.state.global.name,
        email: this.$store.state.global.email,
        location: this.$store.state.global.location,
      }
    }
  }
}
</script>

<style scoped>

</style>
