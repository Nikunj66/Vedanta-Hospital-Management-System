<template>
  <div class="row">
    <div class="col-xs-6">
      <div class="dataTables_info" id="example1_info">
        Showing {{ StartIndex + 1 }} to {{ EndIndex }} of
        {{ TotalNumberOfItem }} entries on {{ CurrentPage }} out of
        {{ TotalNumberOfPage }}
      </div>
    </div>
    <div class="col-xs-6">
      <div class="dataTables_paginate paging_bootstrap">
        <ul class="pagination">
          <li
            class="prev"
            :class="{ disabled: !isShowPrevBtn }"
            id="example1_previous"
          >
            <a
              @click="changePage(PreviousPageUrl)"
              aria-controls="example1"
              data-dt-idx="0"
              tabindex="0"
              class="page-link"
            >
              ← Previous
            </a>
          </li>
          <li class="paginate_button page-item">
            <a
              v-if="isShowPrevOfPrevBtn"
              @click="changePage(PreviousOfPreviousPageUrl)"
              aria-controls="example1"
              data-dt-idx="1"
              tabindex="0"
              class="active"
            >
              {{ PreviousOfPreviousPage }}
            </a>
          </li>
          <li class="paginate_button page-item">
            <a
              v-if="isShowPrevBtn"
              @click="changePage(PreviousPageUrl)"
              aria-controls="example1"
              data-dt-idx="2"
              tabindex="0"
              class="page-link"
            >
              {{ PreviousPage }}
            </a>
          </li>
          <li class="paginate_button page-item active">
            <a
              aria-controls="example1"
              data-dt-idx="3"
              tabindex="0"
              class="page-link"
            >
              {{ CurrentPage }}
            </a>
          </li>
          <li class="paginate_button page-item">
            <a
              v-if="isShowNextBtn"
              @click="changePage(NextPageUrl)"
              aria-controls="example1"
              data-dt-idx="4"
              tabindex="0"
              class="page-link"
            >
              {{ NextPage }}
            </a>
          </li>
          <li class="paginate_button page-item">
            <a
              v-if="isShowNextOfNextBtn"
              @click="changePage(NextOfNextPageUrl)"
              aria-controls="example1"
              data-dt-idx="4"
              tabindex="0"
              class="page-link"
            >
              {{ NextOfNextPage }}
            </a>
          </li>
          <li
            class="next"
            :class="{ disabled: !isShowNextBtn }"
            id="example1_next"
          >
            <a
              @click="changePage(NextPageUrl)"
              aria-controls="example1"
              data-dt-idx="7"
              tabindex="0"
              class="next"
            >
              Next →
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: [
    "BaseUrl",
    "StartIndex",
    "EndIndex",
    "TotalNumberOfItem",
    "CurrentPage",
    "TotalNumberOfPage",
  ],
  data() {
    return {};
  },
  methods: {
    changePage(url) {
      this.$emit("loadPage", url);
    },
  },
  computed: {
    CurrentPageUrl() {
      return this.BaseUrl + this.CurrentPage;
    },
    PreviousPage() {
      return this.CurrentPage - 1;
    },
    PreviousPageUrl() {
      return this.BaseUrl + this.PreviousPage;
    },
    PreviousOfPreviousPage() {
      return this.CurrentPage - 2;
    },
    PreviousOfPreviousPageUrl() {
      return this.BaseUrl + this.PreviousOfPreviousPage;
    },
    NextPage() {
      return parseInt(this.CurrentPage) + 1;
    },
    NextPageUrl() {
      return this.BaseUrl + this.NextPage;
    },
    NextOfNextPage() {
      return parseInt(this.CurrentPage) + 2;
    },
    NextOfNextPageUrl() {
      return this.BaseUrl + this.NextOfNextPage;
    },
    isShowPrevBtn() {
      return this.PreviousPage > 0;
    },
    isShowPrevOfPrevBtn() {
      return this.PreviousOfPreviousPage > 0;
    },
    isShowNextBtn() {
      return this.NextPage <= this.TotalNumberOfPage;
    },
    isShowNextOfNextBtn() {
      return this.NextOfNextPage <= this.TotalNumberOfPage;
    },
  },
};
</script>

