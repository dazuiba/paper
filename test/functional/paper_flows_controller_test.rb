require 'test_helper'

class PaperFlowsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:paper_flows)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create paper_flow" do
    assert_difference('PaperFlow.count') do
      post :create, :paper_flow => { }
    end

    assert_redirected_to paper_flow_path(assigns(:paper_flow))
  end

  test "should show paper_flow" do
    get :show, :id => paper_flows(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => paper_flows(:one).to_param
    assert_response :success
  end

  test "should update paper_flow" do
    put :update, :id => paper_flows(:one).to_param, :paper_flow => { }
    assert_redirected_to paper_flow_path(assigns(:paper_flow))
  end

  test "should destroy paper_flow" do
    assert_difference('PaperFlow.count', -1) do
      delete :destroy, :id => paper_flows(:one).to_param
    end

    assert_redirected_to paper_flows_path
  end
end
